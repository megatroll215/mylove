package service;

import db.DB;
import model.User;

import java.util.List;
import java.util.Scanner;

public class Operator {

    protected static final Scanner sc = new Scanner(System.in);

    private UserService userService = new UserService();

    private void generateOperation()
    {
        System.out.println
                (
                        "=====================\n"
                        +"1. Add User\n"
                        +"2. Remove User\n"
                        +"3. Update User\n"
                        +"4. Show user\n"
                        +"5. Exit\n"
                        +"======================="
                );
    }

    public void operate()
    {
        do
        {
            generateOperation();
            int choice = 0;
            try
            {
                System.out.print("Enter your choice: ");
                choice =  Integer.parseInt(sc.nextLine());
            }catch (NumberFormatException e)
            {
                choice = -1;
            }
            switch (choice)
            {
                case 1: addUserFromScreen();break;
                case 2: break;
                case 3: break;
                case 4: userService.showUser();break;
                case 5: return;
                default:
                    System.out.println("invalid choice!");
                    System.out.print("Enter your choice again: ");
                    try {
                        choice = Integer.parseInt(sc.nextLine());
                    }
                    catch (NumberFormatException e)
                    {
                        choice = -1;
                    }
                    break;
            }
        }
        while (true);
    }


    private void addUserFromScreen()
    {
        //input user info
        int id = 0;
        do
        {
            System.out.println("Enter id: ");
            try {
                id = Integer.parseInt(sc.nextLine());
            }catch (NumberFormatException numberFormatException){
                System.out.println("id must be a number!!");
                id = -1;
            }
        }
        while (id<=0);
        String name;
        do
        {
            System.out.println("Enter name: ");
            name = sc.nextLine();
        }
        while (name.isEmpty());
        String address;
        do
        {
            System.out.println("Enter address: ");
            address = sc.nextLine();
        }
        while (address.isEmpty());
        int age = 0;
        do
        {
            System.out.println("Enter age: ");
            try {
                age = Integer.parseInt(sc.nextLine());
            }catch (NumberFormatException numberFormatException){
                age = -1;
            }
        }
        while (age<=0);
        //add to db
        userService.addUser(new User(id,name,age,address));
    }
}
