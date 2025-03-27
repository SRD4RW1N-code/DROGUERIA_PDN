package DRUGS_PDN.demo.User;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public UserResponse updateUser(UserRequest userRequest) {

        User user = User.builder()
        .id(userRequest.id)
        .email(userRequest.email)
        .tel(userRequest.getTel())
        .role(Role.USER)
        .build();

        userRepository.updateUser(user.id, user.email, user.tel);
        
        return new UserResponse("El usuario se registro satisfactoriamente");
    }

    public UserDTO getUser(Integer id){
        User user = userRepository.findById(id).orElse(null);

        if (user!=null)
        {
            UserDTO userDTO = UserDTO.builder()
            .id(user.id)
            .username(user.username)
            .email(user.email)
            .tel(user.tel)
            .build();
            return userDTO;
        }
        return null;
    }
}
