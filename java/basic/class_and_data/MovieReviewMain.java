package basic.class_and_data;

public class MovieReviewMain {
  public static void main(String[] args) {
    MovieReview movieReview1 = new MovieReview("인셉션", "인생은 무한 루프");
    MovieReview movieReview2 = new MovieReview("어바웃 타임", "인생 시간 영화!");

    MovieReview[] movieReviews = {movieReview1, movieReview2};

    for (MovieReview movieReview : movieReviews) {
      System.out.println("영화 제목: " + movieReview.title + ", 리뷰: " + movieReview.review);
    }
  }
}
