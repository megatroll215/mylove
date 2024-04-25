package db;

import model.Company;
import model.User;

import java.util.ArrayList;
import java.util.List;

public class DB {
    private static List<User> userDB = new ArrayList<>();
    private static List<Company> companyDB = new ArrayList<>();

    public static List<User> getUserDB() {
        return userDB;
    }

    public static void setUserDB(List<User> userDB) {
        DB.userDB = userDB;
    }

    public static List<Company> getCompanyDB() {
        return companyDB;
    }

    public static void setCompanyDB(List<Company> companyDB) {
        DB.companyDB = companyDB;
    }
}
