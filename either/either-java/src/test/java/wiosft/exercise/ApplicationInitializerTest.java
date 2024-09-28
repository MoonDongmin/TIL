package wiosft.exercise;

import io.vavr.control.Either;
import io.vavr.control.Either.Left;
import io.vavr.control.Either.Right;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.*;
import static wiosft.exercise.ApplicationInitializer.getDataFromService;

class ApplicationInitializerTest {

  @ParameterizedTest
  @CsvSource({
          "0.6, Success: This is the data from the service",
          "0.4, Error: Failed to fetch data"
  })
  public void testGetDataFromService(
          final double value,
          final String expected
  ) {
    var result = getDataFromService(value);

    var message = switch (result) {
      case Left left -> "Error: " + left.getLeft();
      case Right right -> "Success: " + right.get();
      default -> throw new IllegalStateException("Unexpected value: " + result);
    };

    assertEquals(expected, message);


  }

}