// Defining a class
class Car {
    // Fields (attributes)
    String brand;
    int year;

    // Constructor
    Car(String b, int y) {
        brand = b;
        year = y;
    }

    // Method
    void displayInfo() {
        System.out.println("Car Brand: " + brand + ", Year: " + year);
    }
}

// Main class
public class ClassExample {
    public static void main(String[] args) {
        // Creating objects
        Car car1 = new Car("Toyota", 2020);
        Car car2 = new Car("Honda", 2022);

        // Calling methods
        car1.displayInfo();
        car2.displayInfo();
    }
}
