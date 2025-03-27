package DRUGS_PDN.demo.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    @Modifying()
    @Query("update User u set u.email=:email, u.tel=:tel where u.id=:id")
    void updateUser(@Param(value = "id") Integer id, @Param(value = "email") String email, @Param(value = "tel") String tel);
    
}
