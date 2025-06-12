package DRUGS_PDN.demo.User;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
public class UserFirestoreService {

    public void saveLogin(String email, String authMethod, String username, String tel, String password) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        Map<String, Object> data = new HashMap<>();
        data.put("email", email);
        data.put("authMethod", authMethod);
        data.put("username", username);
        data.put("tel", tel);
        data.put("password", password);  // ya cifrada
        data.put("timestamp", FieldValue.serverTimestamp());
        data.put("dateOnly", java.time.LocalDate.now().toString());

        db.collection("users").add(data).get();
    }

    public List<UserLoginInfo> getAllLogins() throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = db.collection("users").get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        List<UserLoginInfo> logins = new ArrayList<>();
        for (QueryDocumentSnapshot doc : documents) {
            UserLoginInfo info = new UserLoginInfo();
            info.setEmail(doc.getString("email"));
            info.setAuthMethod(doc.getString("authMethod"));
            info.setUsername(doc.getString("username"));
            info.setTel(doc.getString("tel"));
            info.setPassword(doc.getString("password"));
            info.setDateOnly(doc.getString("dateOnly"));
            info.setTimestamp(doc.getTimestamp("timestamp") != null
                    ? doc.getTimestamp("timestamp").toDate().toString() : null);
            logins.add(info);
        }

        return logins;
    }


}
