package controllers;

import play.mvc.*;


public class Application extends Controller {
  
  public static Result index() {
    return ok("Got the request : " + request() );
  }
  
  public static Result respondCoordsId(Long paramID){
	  return TODO;
  }
  
  public static Result respondForHeightGreaterThan(Long paramHeightGt){
	  return TODO;
  }
  
  public static Result respondForHeightLessThan(Long paramHeightLt){
	  return TODO;
  }
  
  public static Result respondWithQueryParams(){
	  return TODO;
  }
  
}