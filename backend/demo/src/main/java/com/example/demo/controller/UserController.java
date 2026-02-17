package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.dto.ChangePasswordRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // ✅ Question key → readable text mapping
    private static final Map<String, String> QUESTION_MAP = Map.of(
        "nickname", "What is your Nickname?",
        "school", "What is your First School Name?",
        "birthplace", "What is your Place of Birth?",
        "mother", "What is your Mother’s Surname?"
    );

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {

        if (!isValidPassword(user.getPassword())) {
            return "Password does not meet required rules";
        }

        user.setPasswordChangeDate(java.time.LocalDate.now());
        userRepository.save(user);

        return "User registered successfully";
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody User loginUser) {

        Optional<User> optionalUser = userRepository.findById(loginUser.getUserId());

        if (optionalUser.isEmpty()) {
            return "Invalid User ID";
        }

        User dbUser = optionalUser.get();

        if (!dbUser.getPassword().equals(loginUser.getPassword())) {
            return "Invalid Password";
        }

        long monthsBetween = ChronoUnit.MONTHS.between(
                dbUser.getPasswordChangeDate(),
                java.time.LocalDate.now()
        );

        if (monthsBetween >= 1) {
            return "Your Password is Expired. Please Change";
        }

        return "Login Successful";
    }

    @PostMapping("/change-password")
    public String changePassword(@RequestBody ChangePasswordRequest request) {

        Optional<User> optionalUser = userRepository.findById(request.getUserId());

        if (optionalUser.isEmpty()) {
            return "Invalid User ID";
        }

        User dbUser = optionalUser.get();

        if (!dbUser.getPassword().equals(request.getOldPassword())) {
            return "Old password is incorrect";
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            return "New password and confirm password do not match";
        }

        if (!isValidPassword(request.getNewPassword())) {
            return "New password does not meet required rules";
        }

        dbUser.setPassword(request.getNewPassword());
        dbUser.setPasswordChangeDate(java.time.LocalDate.now());

        userRepository.save(dbUser);

        return "Password changed successfully";
    }

    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestBody User user) {

        Optional<User> optionalUser = userRepository.findById(user.getUserId());

        if (optionalUser.isEmpty()) {
            return "Invalid User ID";
        }

        User dbUser = optionalUser.get();

        if (!dbUser.getAnswer1().equals(user.getAnswer1()) ||
            !dbUser.getAnswer2().equals(user.getAnswer2())) {
            return "Your inputs are wrong";
        }

        return "Your password is: " + dbUser.getPassword();
    }

    // ✅ FIXED: always return readable questions
    @GetMapping("/security-questions/{userId}")
    public Map<String, String> getSecurityQuestions(@PathVariable String userId) {

        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isEmpty()) {
            return Map.of("error", "Invalid User ID");
        }

        User user = optionalUser.get();

        Map<String, String> response = new HashMap<>();
        response.put(
            "question1",
            QUESTION_MAP.getOrDefault(user.getQuestion1(), user.getQuestion1())
        );
        response.put(
            "question2",
            QUESTION_MAP.getOrDefault(user.getQuestion2(), user.getQuestion2())
        );

        return response;
    }

    private boolean isValidPassword(String password) {
        if (password == null) return false;
        if (password.length() < 8 || password.length() > 12) return false;
        if (!password.matches(".*[A-Z].*")) return false;
        if (!password.matches(".*[@#$%^&+=!].*")) return false;
        if (!password.matches("[A-Za-z0-9@#$%^&+=!]+")) return false;
        return true;
    }
}
