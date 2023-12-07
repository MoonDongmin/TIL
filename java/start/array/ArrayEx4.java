package basic.array;

import java.util.Scanner;

public class ArrayEx4 {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    int[] numbers = new int[5];
    int total = 0;
    double avg = 0;
    System.out.println("5개의 정수를 입력하시오.");
    for (int i = 0; i < numbers.length; i++) {
      numbers[i] += sc.nextInt();
      total += numbers[i];
    }

    avg = total / numbers.length;

    System.out.println("합계: " + total + "\n" + "평균: " + avg);

  }
}
