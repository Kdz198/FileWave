package hoangtugio.org.filewave.Service;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import hoangtugio.org.filewave.Model.File;
import hoangtugio.org.filewave.Model.FileInfoDTO;
import hoangtugio.org.filewave.Repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Service
public class CloudinaryService {

    @Autowired
    FileService fileService;

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private FileRepository fileRepository;

    public FileInfoDTO uploadFile(MultipartFile file, int expiredHour) throws IOException {
        // Lấy đuôi file làm format
        String originalFilename = file.getOriginalFilename();
        String format = originalFilename != null && originalFilename.contains(".")
                ? originalFilename.substring(originalFilename.lastIndexOf(".") + 1).toLowerCase()
                : "unknown";

        String resource_type = format.equals("pdf") ? "raw" : "auto";


        // Tạo tên file có đuôi mở rộng để Office Viewer nhận
        String filenameWithExtension = format.equals("pdf")
                ? UUID.randomUUID().toString()
                : UUID.randomUUID() + "." + format;

        if (format.equals("exe")) {
            filenameWithExtension =UUID.randomUUID().toString();
        }

        // Upload lên Cloudinary
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "resource_type", resource_type,
                "folder", "FileWave",
                "public_id", filenameWithExtension,
                "use_filename", true,
                "unique_filename", false
        ));


        System.out.println("Upload result: " + uploadResult);
        // Lấy URL và resource type
        String secureUrl = uploadResult.get("secure_url").toString();
        String type = uploadResult.get("resource_type").toString();
        String publicId = uploadResult.get("public_id").toString();
        // Lưu vào DB và trả về DTO
        File saved = fileService.saveFile(new File(secureUrl, type, format, expiredHour, publicId));
        return new FileInfoDTO(saved.getPath(), saved.getCode(), format);
    }

    public void  deleteFile(String publicId, String resource_type) {
        // Xoá file trên Cloudinary
        try {
            Map map = cloudinary.uploader().destroy(publicId, ObjectUtils.asMap(
                    "resource_type", resource_type));
            System.out.println("Delete result: " + map);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


    @Scheduled(fixedRate = 60 * 60 * 1000) // 1 tiếng
    public void deleteExpiredFiles() {
        System.out.println("Running scheduled task to delete expired files...");
        fileRepository.findAll().forEach(file -> {
            if (file.getCreatedAt().plusHours(file.getExpiredHour()).isBefore(LocalDateTime.now())) {
                deleteFile(file.getPublicId(),file.getType());
                fileRepository.delete(file);
            }
        });
    }

}
