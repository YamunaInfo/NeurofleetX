class Car {
    String brand;
    int year;

    void display() {
        System.out.println("Car Brand: " + brand + ", Year: " + year);
    }
}

public class ObjectDemo {
    public static void main(String[] args) {
        // Creating objects
        Car car1 = new Car();
        car1.brand = "Tesla";
        car1.year = 2023;

        Car car2 = new Car();
        car2.brand = "BMW";
        car2.year = 2022;

        // Calling method
        car1.display();
        car2.display();
    }
}
