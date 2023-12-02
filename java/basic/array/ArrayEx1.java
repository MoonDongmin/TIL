package basic.array;

public class ArrayEx1 {
  public static void main(String[] args) {
    int[] student = {90, 80, 70, 60, 50};
    int total = 0;

    for (int i = 0; i < student.length; i++) {
      total += student[i];
    }
    float avg = total / student.length;

    System.out.println("점수 총합: " + total);
    System.out.println("점수 평균: " + avg);
  }
}
