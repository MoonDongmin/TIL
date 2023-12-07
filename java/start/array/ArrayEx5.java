package basic.array;

import java.util.Scanner;

public class ArrayEx5 {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int total = 0;
    double avg = 0;

    System.out.print("입력받을 숫자의 개수를 입력하세요: ");
    int a = sc.nextInt();
    int[] numbers = new int[a];

    System.out.println(a + "개의 정수를 입력하세요: ");
    for (int i = 0; i < numbers.length; i++) {
      numbers[i] += sc.nextInt();
      total += numbers[i];
    }
    avg = total / numbers.length;

    System.out.println("입력한 정수의 합계: " + total);
    System.out.println("입력한 정수의 평균: " + avg);

  }
}
