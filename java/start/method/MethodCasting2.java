package basic.method;

public class MethodCasting2 {
  public static void main(String[] args) {
    int number = 1;
    printNumber(number); // 자동 형변환을 통해 int를 double로 변환

  }

  public static void printNumber(double i) {
    System.out.println("숫자: " + i);
  }
}
