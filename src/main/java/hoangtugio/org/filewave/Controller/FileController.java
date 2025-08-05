package hoangtugio.org.filewave.Controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import hoangtugio.org.filewave.Model.File;
import hoangtugio.org.filewave.Service.CloudinaryService;
import hoangtugio.org.filewave.Service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

@RestController
public class FileController {

    @Autowired
    FileService fileService;

    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping
    public String uploadFile(@RequestParam MultipartFile file, @RequestParam int expiredHour) throws IOException {
        String url = cloudinaryService.uploadFile(file, expiredHour);
        return url;
    }

    @GetMapping("{code}")
    public String viewFile (@PathVariable String code) {
        File file = fileService.getFileByCode(code);
        if (file == null) {
            return "File Not Found";
        }
        return file.getPath();
    }



//    @PostMapping
//    public String uploadFile (@RequestParam MultipartFile file) throws IOException {
//        // 1. Tạo thư mục nếu chưa có
//        String uploadDir =System.getProperty("user.dir") + "/uploads";
//        System.out.println(uploadDir);
//        System.out.println(file.getOriginalFilename());
//        Files.createDirectories(Paths.get(uploadDir));
//
//        // 2. Tạo tên file duy nhất
//        String originalFilename = file.getOriginalFilename();
//        String uniqueName = UUID.randomUUID() + "_" + originalFilename;
//        Path filePath = Paths.get(uploadDir, uniqueName);
//
//        // 3. Lưu file vào local
//        file.transferTo(filePath.toFile());
//
//        // 4. Lưu path vào DB
//        File saved = fileService.saveFile(new File(0, null, filePath.toString()));
//
//        // 5. Trả về link truy cập
//        return saved.toString();
//    }





//    @GetMapping("{id}")
//    public ResponseEntity<Resource> downloadFile(@PathVariable Long id) throws IOException {
//        File fileMeta = fileService.getFile(id); // lấy từ DB
//        Path path = Paths.get(fileMeta.getPath());
//
//
//        Resource resource = new UrlResource(path.toUri());
//
//        String contentType = Files.probeContentType(path); // xác định mime type
//
//        return ResponseEntity.ok()
//                .contentType(MediaType.parseMediaType(contentType))
//                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + path.getFileName() + "\"")
//                .body(resource);

        //Body: File gốc
        //Content-Type: để hiển thị png,pdf,mp3,...
        //Content-Disposition: ra lệnh cho client xử lý cái file <inline,Hiển thị>, <attachment,tải xuống>
//    }
}
