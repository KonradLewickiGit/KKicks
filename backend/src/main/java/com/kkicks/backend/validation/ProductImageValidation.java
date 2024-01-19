package com.kkicks.backend.validation;

import org.springframework.web.multipart.MultipartFile;

public class ProductImageValidation {
    private static final String[] ALLOWED_FILE_EXTENSIONS = { "jpg", "jpeg", "png" };

    public static boolean isFileValid(MultipartFile file) {
        if (file.isEmpty()) {
            return false;
        }
        String originalFileName = file.getOriginalFilename();
        String fileExtension = getFileExtension(originalFileName);
        for (String allowedExtension : ALLOWED_FILE_EXTENSIONS) {
            if (fileExtension.equalsIgnoreCase(allowedExtension)) {
                return true;
            }
        }
        return false;
    }

    private static String getFileExtension(String fileName) {
        if (fileName.lastIndexOf(".") != -1 && fileName.lastIndexOf(".") != 0) {
            return fileName.substring(fileName.lastIndexOf(".") + 1);
        } else {
            return "";
        }
    }
}
