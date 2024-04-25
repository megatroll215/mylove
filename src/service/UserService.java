package service;

import db.DB;
import model.User;

import java.util.List;

public class UserService {

    public void showUser()
    {
        List<User> users =  DB.getUserDB();
        if(users.isEmpty())
        {
            System.out.println("empty!");
            return;
        }
        System.out.println(String.format("%5s%20s%5s%30s","ID","NAME","AGE","ADDRESS"));
        for (User u:users) {
            System.out.println(u.toString());
        }
    }

    public List<User> getAllUser()
    {
        return DB.getUserDB();
    }

    public void addUser(User user)
    {
        List<User> db =  DB.getUserDB();
        if(user==null)
        {
            System.out.println("Bad request!!");
            return;
        }
        for(User u : db)
        {
            if(user.getId()==u.getId())
            {
                System.out.println("Id is existed!!");
                return;
            }
            if(user.getName().equals(u.getName()))
            {
                System.out.println("Name is existed!!");
                return;
            }
        }
        db.add(user);
        DB.setUserDB(db);
    }
}
