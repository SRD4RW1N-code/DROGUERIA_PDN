package DRUGS_PDN.demo.User;

import lombok.Data;

@Data
public class UserLoginInfo {
    private String email;
    private String authMethod;
    private String username;
    private String tel;
    private String password;
    private String dateOnly;
    private String timestamp;
}
