package wiosft.exercise;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.vavr.control.Either;
import org.apache.hc.client5.http.classic.methods.HttpGet;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.CloseableHttpResponse;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.ParseException;
import org.apache.hc.core5.http.io.entity.EntityUtils;

import java.io.IOException;


public class ApplicationInitializer {
  private static final String API_URL = "http://localhost:3000?v=0.6";
  private static final Gson GSON = new Gson();

  public static void main(final String... args) {
    try (final CloseableHttpClient httpClient = HttpClients.createDefault()) {
      final HttpGet request = new HttpGet(API_URL);

      try (final CloseableHttpResponse response = httpClient.execute(request)) {
        handleResponse(response);
      }
    } catch (IOException | ParseException e) {
      e.printStackTrace();
    }

//    var result = getDataFromService(Math.random());
//
//    var message = switch (result) {
//      case Either.Left left -> "Error: " + left.getLeft();
//      case Either.Right right -> "Success: " + right.get();
//      default -> throw new IllegalStateException("Unexpected value: " + result);
//    };
//
//    System.out.println(message);
  }

  private static void handleResponse(final CloseableHttpResponse response) throws IOException, ParseException {
    final String jsonResponse = EntityUtils.toString(response.getEntity());
    final JsonObject jsonObject = GSON.fromJson(jsonResponse, JsonObject.class);

    if (jsonObject.has("_tag")) {
      System.out.println(jsonResponse);
      final var tag = jsonObject.get("_tag").getAsString();
      final Either<ErrorDto, SuccessDto> result = switch (tag) {
        case "Left" -> Either.left(GSON.fromJson(jsonObject.getAsJsonObject("left"), ErrorDto.class));
        case "Right" -> Either.right(GSON.fromJson(jsonObject.getAsJsonObject("right"), SuccessDto.class));
        default -> throw new IllegalStateException("Unexpected value: " + tag);
      };

      handleResult(result);
    } else {
      System.out.println("Error: '_tag' field is missing or null in the response");
    }
  }

  private static void handleResult(final Either<ErrorDto, SuccessDto> result) {
    System.out.println(result.isRight() ?
            "right: " + result.get().toString()
            : "left: " + result.getLeft().error);
  }

  static Either<String, String> getDataFromService(
          double value
  ) {
    return value > 0.5
            ? Either.right("This is the data from the service")
            : Either.left("Failed to fetch data");
  }
}