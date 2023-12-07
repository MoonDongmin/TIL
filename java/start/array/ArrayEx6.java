package basic.array;

import java.util.Scanner;

public class ArrayEx6 {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("입력받을 숫자의 개수를 입력하시오:");
    int a = sc.nextInt();
    int[] numbers = new int[a];


    System.out.println(a + "개의 정수를 입력하세요: ");
    for (int i = 0; i < numbers.length; i++) {
      numbers[i] += sc.nextInt();
    }

    int big = numbers[0], small = numbers[0];

    for (int i = 0; i < numbers.length; i++) {
      if (small > numbers[i]) {
        small = numbers[i];
      }
      if (big < numbers[i]) {
        big = numbers[i];
      }
    }
    System.out.println("가장 작은 정수: " + small);
    System.out.println("가장 큰 정수: " + big);
  }
}
