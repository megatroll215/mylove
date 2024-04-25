package model;

import java.util.List;

public class Company {
    private List<User> user;

    public Company(List<User> user) {
        this.user = user;
    }

    public List<User> getUser() {
        return user;
    }

    public void setUser(List<User> user) {
        this.user = user;
    }
}
