package hoangtugio.org.filewave.Repository;

import hoangtugio.org.filewave.Model.File;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FileRepository  extends JpaRepository<File, Long> {
    boolean existsByCode(String code);

    Optional<File> findByCode(String code);
}
