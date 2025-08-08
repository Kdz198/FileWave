package hoangtugio.org.filewave.Service;

import hoangtugio.org.filewave.Model.File;
import hoangtugio.org.filewave.Repository.FileRepository;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class FileService {

    @Autowired
    private FileRepository fileRepository;


    public File saveFile(File file) {
        file.setCode(generateUniqueCode());
        return fileRepository.save(file);
    }

    public File getFileByCode(String code) {
        Optional<File> file = fileRepository.findByCode(code);

        return file.orElse(null);
    }

    private String generateUniqueCode() {
        String chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
        String code;
        do {
            code = RandomStringUtils.random(6, chars);
        } while (fileRepository.existsByCode(code));
        return code;
    }



}
