package controllers;

import static play.libs.Json.toJson;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import org.codehaus.jackson.node.ObjectNode;

import models.ApplicationModel;
import play.libs.Json;
import play.mvc.*;


public class Application extends Controller {
  
  public static Result index() {
    return ok("Got the request : " + request() );
  }
  
  public static Result respondCoordsId(Long paramId) throws SQLException{
	  ResultSet resultSetForId = ApplicationModel.getCoordinatesForId(paramId);
	  ObjectNode resultSetAsJson = Json.newObject();

		while(resultSetForId.next()){
			resultSetAsJson.put("id", resultSetForId.getString("id"));
			resultSetAsJson.put("name", resultSetForId.getString("name"));
			resultSetAsJson.put("start_date", resultSetForId.getString("start_date"));
			resultSetAsJson.put("x_coord", resultSetForId.getString("x_coord"));
			resultSetAsJson.put("y_coord", resultSetForId.getString("y_coord"));
			resultSetAsJson.put("z_coord", resultSetForId.getString("z_coord"));
			resultSetAsJson.put("height", resultSetForId.getString("height"));
		}
		return ok(toJson(resultSetAsJson));
  }
  
  public static Result respondForHeightGreaterThan(Long paramHeightGt) throws SQLException{
	  ResultSet resultSetForHeightGreaterThan = ApplicationModel.getHeightGreaterThan(paramHeightGt);
	  ArrayList<ObjectNode> jsonArray = new ArrayList<ObjectNode>();
	  
		while(resultSetForHeightGreaterThan.next()){
			ObjectNode resultSetAsJson = Json.newObject();
			resultSetAsJson.put( "x_coords",resultSetForHeightGreaterThan.getString("x_coord") );
			resultSetAsJson.put( "y_coords",resultSetForHeightGreaterThan.getString("y_coord") );
			resultSetAsJson.put( "z_coords",resultSetForHeightGreaterThan.getString("z_coord") );
			resultSetAsJson.put( "height",resultSetForHeightGreaterThan.getString("height") );
			jsonArray.add(resultSetAsJson);
		}

		return ok(toJson(jsonArray));
  }
  
  public static Result respondForHeightLessThan(Long paramHeightLt) throws SQLException{
	  ResultSet resultSetForHeighLessThan = ApplicationModel.getHeightLessThan(paramHeightLt);
	  ArrayList<ObjectNode> jsonArray = new ArrayList<ObjectNode>();
	  
		while(resultSetForHeighLessThan.next()){
			ObjectNode resultSetAsJson = Json.newObject();
			resultSetAsJson.put( "x_coords",resultSetForHeighLessThan.getString("x_coord") );
			resultSetAsJson.put( "y_coords",resultSetForHeighLessThan.getString("y_coord") );
			resultSetAsJson.put( "z_coords",resultSetForHeighLessThan.getString("z_coord") );
			resultSetAsJson.put( "height",resultSetForHeighLessThan.getString("height") );
			jsonArray.add(resultSetAsJson);
		}

		return ok(toJson(jsonArray));
  }
  
  public static Result respondWithQueryParams() throws SQLException{
	  
		// prepare first part of query string
		String queryString = "SELECT * FROM test_table WHERE";
		
		// prepare second part of query string i.e. condition
		String condition = "";
		
		// HashMap to check with incoming query string parameters
		Map<String,String> coordsMap = new HashMap<String,String>();
		    coordsMap.put("xlt","x_coord <");
		    coordsMap.put("xgt","x_coord >");
		    coordsMap.put("ylt","y_coord <");
		    coordsMap.put("ygt","y_coord >");
		    coordsMap.put("zlt","z_coord <");
		    coordsMap.put("zgt","z_coord >");
		    
		// incoming query string parameters    
		final Set<Entry<String, String[]>> entries = request().queryString().entrySet();
		
		for (Entry<String, String[]> entry : entries) {
			
			queryString += condition + " " + coordsMap.get(entry.getKey()) + " " + entry.getValue()[0];
			if (condition == "") {
				condition = " AND";
			}
		}
		ResultSet resultSetForQueryParams = ApplicationModel.getValuesByQueryParams(queryString);
		ArrayList<ObjectNode> jsonArray = new ArrayList<ObjectNode>();
		while(resultSetForQueryParams.next()){
			
			ObjectNode resultSetAsJson = Json.newObject();
			resultSetAsJson.put( "x_coords",resultSetForQueryParams.getString("x_coord") );
			resultSetAsJson.put( "y_coords",resultSetForQueryParams.getString("y_coord") );
			resultSetAsJson.put( "z_coords",resultSetForQueryParams.getString("z_coord") );
			resultSetAsJson.put( "height",resultSetForQueryParams.getString("height") );
			
			jsonArray.add(resultSetAsJson);
		}
		return ok(toJson(jsonArray));
	  
  	}
  
}