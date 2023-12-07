package basic.method;

public class MethodCasting1 {
  public static void main(String[] args) {
    double number = 1.5;
    //printNumber(number); // double 을 int에 대입하므로 컴파일 오류
    printNumber((int) number); // 명시적 형변환을 통해 double을 int로 변환

  }

  public static void printNumber(int i) {
    System.out.println("숫자: " + i);
  }
}
