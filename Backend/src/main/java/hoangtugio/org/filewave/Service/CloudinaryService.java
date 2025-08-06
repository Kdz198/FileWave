package hoangtugio.org.filewave.Service;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import hoangtugio.org.filewave.Model.File;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    @Autowired
    FileService fileService;

    @Autowired
    private Cloudinary cloudinary;

    public String uploadFile(MultipartFile file, int expiredHour) throws IOException {
//        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        boolean isPdf = "application/pdf".equalsIgnoreCase(file.getContentType());
        String resourceType = isPdf ? "raw" : "auto";
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "resource_type", resourceType,
                "folder", "FileWave"));
        System.out.println(uploadResult.toString());
        String secureUrl = uploadResult.get("secure_url").toString();
        if (isPdf)
        {
            secureUrl = "https://docs.google.com/gview?url="+secureUrl;
            }
        String type = uploadResult.get("resource_type").toString();
        String format = uploadResult.get("format") != null ? uploadResult.get("format").toString() : "pdf";
        File saved = fileService.saveFile(new File( secureUrl,type,format,expiredHour));


        return secureUrl;
    }
}
