package basic.method;

public class Method1Ref {
  public static void main(String[] args) {
    // 메서드를 사용하면 반복되는 코드를 쉽게 바꿀 수 있음

    // 계산1
    int sum1 = add(5, 10);
    System.out.println("결과1 출력: " + sum1);

    // 계산2
    int sum2 = add(15, 20);
    System.out.println("결과2 출력: " + sum2);


  }

  // add 메서드
  public static int add(int a, int b) { // 메서드의 선언 부분 -> 메서드 이름, 반환 타입, 파라미터 목록을 포함함
    System.out.println(a + "+" + b + " 연산 수헹");
    int sum = a + b;
    return sum;
  }
}

