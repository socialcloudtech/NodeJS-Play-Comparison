package controllers;

import static play.libs.Json.toJson;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import org.codehaus.jackson.node.ObjectNode;

import models.ApplicationModel;
import play.libs.Json;
import play.mvc.*;

public class Application extends Controller {

	/**
	 * @return
	 */
	public static Result index() {
		return ok("Got the request : " + request());
	}

	/**
	 * Handler for /coords/:id route
	 * @param {Long} paramId : Long representing the id
	 * @return {ObjectNode} resultSetAsJson : ObjectNode representing the result as JSON
	 * 
	 * @throws SQLException
	 */
	public static Result respondCoordsId(Long paramId) throws SQLException {
		
		/*
		 *  {ResultSet} resultSetForId : ResultSet to handle result from getCoordinatesForId.
		 *  {Function} getCoordinatesForId: Static function of ApplicationModel that accepts the Long and returns the result of query on the basis of passed paramId
		 * 
		 */
		ResultSet resultSetForId = ApplicationModel
				.getCoordinatesForId(paramId);
		ObjectNode resultSetAsJson = Json.newObject();

		while (resultSetForId.next()) {
			resultSetAsJson.put("id", resultSetForId.getInt("id"));
			resultSetAsJson.put("name", resultSetForId.getString("name"));
			resultSetAsJson.put("start_date",
					resultSetForId.getString("start_date"));
			resultSetAsJson.put("x_coord", resultSetForId.getBigDecimal("x_coord"));
			resultSetAsJson.put("y_coord", resultSetForId.getBigDecimal("y_coord"));
			resultSetAsJson.put("z_coord", resultSetForId.getBigDecimal("z_coord"));
			resultSetAsJson.put("height", resultSetForId.getBigDecimal("height"));
		}
		return ok(toJson(resultSetAsJson));
	}

	/**
	 * Handler for /coords/height/gt/:paramHeightGt route
	 * @param {Long} paramHeightGt : Long representing the greater than height
	 * @return {ArrayList{ObjectNode}} jsonArray : ArrayList of ObjectNode representing the array of JSON elements
	 * 
	 * @throws SQLException
	 */
	public static Result respondForHeightGreaterThan(Long paramHeightGt)
			throws SQLException {
		
		/*
		 * 
		 *  {ResultSet} resultSetForHeightGreaterThan : ResultSet to handle result from getHeightGreaterThan.
		 *  {Function} getHeightGreaterThan : Static function of ApplicationModel that accepts the Long and returns the result of query on the basis of passed paramHeightGt
		 *  {ObjectNode} resultSetAsJson: ObjectNode representing the single JSON element. 
		 */
		ResultSet resultSetForHeightGreaterThan = ApplicationModel
				.getHeightGreaterThan(paramHeightGt);
		ArrayList<ObjectNode> jsonArray = new ArrayList<ObjectNode>();

		while (resultSetForHeightGreaterThan.next()) {
			ObjectNode resultSetAsJson = Json.newObject();
			resultSetAsJson.put("x_coords",
					resultSetForHeightGreaterThan.getBigDecimal("x_coord"));
			resultSetAsJson.put("y_coords",
					resultSetForHeightGreaterThan.getBigDecimal("y_coord"));
			resultSetAsJson.put("z_coords",
					resultSetForHeightGreaterThan.getBigDecimal("z_coord"));
			resultSetAsJson.put("height",
					resultSetForHeightGreaterThan.getBigDecimal("height"));
			jsonArray.add(resultSetAsJson);
		}

		return ok(toJson(jsonArray));
	}

	/**
	 * Handler for /coords/height/lt/:paramHeightLt route
	 * @param {Long} paramHeightLt : Long representing the less than height
	 * @return {ArrayList{ObjectNode}} jsonArray : ArrayList of ObjectNode representing the array of JSON elements.
	 * 	  
	 * @throws SQLException
	 */
	public static Result respondForHeightLessThan(Long paramHeightLt)
			throws SQLException {
		
		 /* 
		  *  {ResultSet} resultSetForHeighLessThan : ResultSet to handle result from getHeightLessThan.
		  *  {Function} getHeightLessThan: Static function of ApplicationModel that accepts the Long and returns the result of query on the basis of passed paramHeightLt
		  *  {ObjectNode} resultSetAsJson : ObjectNode to represent single element of JSON
		  */
		ResultSet resultSetForHeighLessThan = ApplicationModel
				.getHeightLessThan(paramHeightLt);
		ArrayList<ObjectNode> jsonArray = new ArrayList<ObjectNode>();

		while (resultSetForHeighLessThan.next()) {
			ObjectNode resultSetAsJson = Json.newObject();
			resultSetAsJson.put("x_coords",
					resultSetForHeighLessThan.getBigDecimal("x_coord"));
			resultSetAsJson.put("y_coords",
					resultSetForHeighLessThan.getBigDecimal("y_coord"));
			resultSetAsJson.put("z_coords",
					resultSetForHeighLessThan.getBigDecimal("z_coord"));
			resultSetAsJson.put("height",
					resultSetForHeighLessThan.getBigDecimal("height"));
			jsonArray.add(resultSetAsJson);
		}

		return ok(toJson(jsonArray));
	}
	
	/**
	 * Handler for /coords/product/all
	 * @return {ArrayList{ObjectNode}} jsonArray : ArrayList of ObjectNode representing the array of JSON elements
	 * @throws SQLException 
	 */
	public static Result respondForAllCoordinates() throws SQLException {
		
		/*
		 * {BigDecimal} product : to store the prodcut of x_coodr,y_coord,and z_coord
		 * {BigDecimal} x_coord : to store x_coord
		 * {BigDecimal} y_coord : to store y_coord
		 * {BigDecimal} z_coord : to store z_coord
		 * 
		 * {Function} getCoordinatesForAll : Static function of ApplicationModel that returns the result of query
		 * {ObjectNode} resultSetAsJson : ObjectNode to represent single element of JSON
		 * 
		 */
		
		BigDecimal product = new BigDecimal(0);
		BigDecimal x_coord = new BigDecimal(0);
		BigDecimal y_coord = new BigDecimal(0);
		BigDecimal z_coord = new BigDecimal(0);
		ResultSet resulstSetForCoordinatesAll = ApplicationModel
				.getCoordinatesForAll();
		
		ArrayList<ObjectNode> jsonArray = new ArrayList<ObjectNode>();

		while (resulstSetForCoordinatesAll.next()) {
			
			ObjectNode resultSetAsJson = Json.newObject();
			
			x_coord = resulstSetForCoordinatesAll.getBigDecimal("x_coord");
			y_coord = resulstSetForCoordinatesAll.getBigDecimal("y_coord");
			z_coord = resulstSetForCoordinatesAll.getBigDecimal("z_coord");
			product = x_coord.multiply(y_coord).multiply(z_coord);
					
			resultSetAsJson.put("x_coords",x_coord);
			resultSetAsJson.put("y_coords",y_coord);
			resultSetAsJson.put("z_coords",z_coord);
			resultSetAsJson.put("height",
					resulstSetForCoordinatesAll.getBigDecimal("height"));
			
			resultSetAsJson.put("product",product);
			
			jsonArray.add(resultSetAsJson);
		}

		return ok(toJson(jsonArray));
	}

	/**
	 * Handler for /coords? route
	 * @return {ArrayList{ObjectNode}} jsonArray : ArrayList of ObjectNode representing the array of JSON elements.
	 * @throws SQLException
	 */
	public static Result respondWithQueryParams() throws SQLException {
		
		/*  {String} queryString : String representing the first part of Query
		 *  {String} condition : String representing the conditional part of Query
		 *  {Map} coordsMap : HashMap representing the combination of greater than and lesser than X,Y,Z coords to be matched with Set of entries   
		 *  {Set} entries : Set representing the http request query string parameters
		 *  {ResultSet} resultSetForQueryParams: ResultSet to handle result from getValuesByQueryParams. 
		 *  {Function} getValuesByQueryParams : Static function of ApplicationModel that accepts the String and returns the result on the basis of queryString
		 *  {ObjectNode} resultSetAsJson : ObjectNode to represent single element of JSON
		 */
		
		// prepare first part of query string
		String queryString = "SELECT * FROM test_table WHERE";

		// prepare second part of query string i.e. condition
		String condition = "";

		// HashMap to check with incoming query string parameters
		Map<String, String> coordsMap = new HashMap<String, String>();
		coordsMap.put("xlt", "x_coord <");
		coordsMap.put("xgt", "x_coord >");
		coordsMap.put("ylt", "y_coord <");
		coordsMap.put("ygt", "y_coord >");
		coordsMap.put("zlt", "z_coord <");
		coordsMap.put("zgt", "z_coord >");

		// incoming query string parameters
		
		final Set<Entry<String, String[]>> entries = request().queryString()
				.entrySet();
		List<Float> coordsValue = new ArrayList<Float>();
		
		for (Entry<String, String[]> entry : entries) {

			queryString += condition + " " + coordsMap.get(entry.getKey())
					+ " " + "?" ;
			
			coordsValue.add(Float.valueOf(entry.getValue()[0]).floatValue());
			
			if (condition == "") {
				condition = " AND";
			}
			
		}
		queryString += " LIMIT 100000";
		System.out.println(queryString);
		ResultSet resultSetForQueryParams = ApplicationModel
				.getValuesByQueryParams(queryString, coordsValue);
		
		ArrayList<ObjectNode> jsonArray = new ArrayList<ObjectNode>();
		
		while (resultSetForQueryParams.next()) {

			ObjectNode resultSetAsJson = Json.newObject();
			resultSetAsJson.put("x_coords",
					resultSetForQueryParams.getString("x_coord"));
			resultSetAsJson.put("y_coords",
					resultSetForQueryParams.getString("y_coord"));
			resultSetAsJson.put("z_coords",
					resultSetForQueryParams.getString("z_coord"));
			resultSetAsJson.put("height",
					resultSetForQueryParams.getString("height"));

			jsonArray.add(resultSetAsJson);
		}
		return ok(toJson(jsonArray));

	}

}