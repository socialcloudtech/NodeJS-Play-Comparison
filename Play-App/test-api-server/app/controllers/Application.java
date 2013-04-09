package controllers;


import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import models.selectRecords;

import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.BodyParser;
import play.libs.Json;
import static play.libs.Json.toJson;

import org.codehaus.jackson.node.ObjectNode; 

public class Application extends Controller {
  
	
	@BodyParser.Of(play.mvc.BodyParser.Json.class)
	public static Result index() {
	  return ok("Got the Request " + request() + "!");
	}

	public static Result getCoordsOnId(Long id) throws SQLException{
		ResultSet res = selectRecords.selectRecordFromTable(id);
		
		ObjectNode result = Json.newObject();
		//res.getc	
		while(res.next()){
			result.put("id", res.getString("id"));
			result.put("name", res.getString("name"));
			result.put("start_date", res.getString("start_date"));
			result.put("x_coord", res.getString("x_coord"));
			result.put("y_coord", res.getString("y_coord"));
			result.put("z_coord", res.getString("z_coord"));
			result.put("height", res.getString("height"));
		}
		ArrayList<ObjectNode> arr = new ArrayList<ObjectNode>();
		arr.add(result);
		//arr.add(result2);
		return ok(toJson(arr));
	}
	
	public static Result getCoordsAll() throws SQLException{
		// multi
		ResultSet res = selectRecords.selectAllRecordsFromTable();
		ArrayList<ObjectNode> arr = new ArrayList<ObjectNode>();

		
		while(res.next()) {
			ObjectNode result = Json.newObject();
			result.put("id", res.getString("id"));
			result.put("name", res.getString("name"));
			result.put("start_date", res.getString("start_date"));
			result.put("x_coord", res.getString("x_coord"));
			result.put("y_coord", res.getString("y_coord"));
			result.put("z_coord", res.getString("z_coord"));
			result.put("height", res.getString("height"));
			arr.add(result);
		}
		
		return ok(toJson(arr));
	}
	
	public static Result getXCoordsGT(String anything) {
		System.out.println(anything);
		return TODO;
	}
	
	public static Result getYCoordsGT(String anything) {
		System.out.println(anything);
		return TODO;
	}
}