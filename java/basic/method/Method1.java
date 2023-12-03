package basic.method;

public class Method1 {
  public static void main(String[] args) {
    // 계산1
    int a = 1;
    int b = 2;
    System.out.println(a + "+" + b + " 연산 수헹");
    int sum1 = a + b;
    System.out.println("결과1 출력: " + sum1);

    int x = 10;
    int y = 20;
    System.out.println(x + "+" + y + " 연산 수헹");
    int sum2 = x + y;
    System.out.println("결과1 출력: " + sum2);
    // 이 코드를 여러번 반복하면 계속해서 반복해야함.
    // 코드를 똑같이 만드려면 다 바꿔줘야하는 귀찮이즘 발생
  }
}
