package hoangtugio.org.filewave.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileInfoDTO {

    String url;
    String code;
    String format;
    LocalDateTime createdAt;
        LocalDateTime expiredAt;

    public FileInfoDTO(String path, String code, String format) {
        this.url = path;
        this.code = code;
        this.format = format;
    }
}
