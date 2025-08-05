package hoangtugio.org.filewave.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;
    @CreationTimestamp
    LocalDateTime createdAt;
    String path;
    String type;
    String format;
    String code;
    int expiredHour;

    public File(String path, String type, String format, int expiredHour) {
        this.path = path;
        this.type = type;
        this.format = format;
        this.expiredHour = expiredHour;

    }
}
