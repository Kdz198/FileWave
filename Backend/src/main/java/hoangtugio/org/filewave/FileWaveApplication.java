package hoangtugio.org.filewave;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class FileWaveApplication {

    public static void main(String[] args) {
        SpringApplication.run(FileWaveApplication.class, args);
        System.out.println("HELLO FPT");
    }

}
