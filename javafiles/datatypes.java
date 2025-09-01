public class DataTypesExample {
    public static void main(String[] args) {
        // Primitive Data Types
        byte b = 100;          // 1 byte
        short s = 20000;       // 2 bytes
        int i = 100000;        // 4 bytes
        long l = 1000000000L;  // 8 bytes
        float f = 12.5f;       // 4 bytes, decimal with f
        double d = 99.99;      // 8 bytes, double precision
        char c = 'A';          // single character
        boolean flag = true;   // true or false

        // Printing values
        System.out.println("byte value: " + b);
        System.out.println("short value: " + s);
        System.out.println("int value: " + i);
        System.out.println("long value: " + l);
        System.out.println("float value: " + f);
        System.out.println("double value: " + d);
        System.out.println("char value: " + c);
        System.out.println("boolean value: " + flag);

        // Non-primitive (String as example)
        String name = "Java";
        System.out.println("String value: " + name);
    }
}
