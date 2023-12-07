package basic.method;

public class MethodEx2Ref {
  public static void main(String[] args) {
    print("hello world",3);
  }

  public static void print(String a, int b) {
    for (int i = 1; i <= b; i++) {
      System.out.println(a);
    }
  }
}
