/**
 * 
 */
package models;

import play.db.DB;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 * 
 * @author sadikr
 * 
 */
public class ApplicationModel {

	static Connection connection = DB.getConnection();

	
	/**
	 * getCoordinatesForAll : It executes Select query on test_table to fetch all the rows,and returns the ResultSet
	 * 
	 * @return {ResultSet} resultSet : ResultSet of parsed SQLQuery.
	 * 
	 * @throws SQLException
	 */
	public static ResultSet getCoordinatesForAll()
			throws SQLException {
		
		String sql = "SELECT * FROM test_table LIMIT 100000";
		PreparedStatement preparedStatement = connection.prepareStatement(sql);
		ResultSet resultSet = preparedStatement.executeQuery();

		return resultSet;
	}
	
	
	/**
	 * @param {Long} paramId : Long representing the id
	 * 
	 * @return {ResultSet} resultSet : ResultSet of parsed SQLQuery.
	 * @throws SQLException
	 */
	public static ResultSet getCoordinatesForId(Long paramId)
			throws SQLException {

		/*
		 * {String} sql : String representing the SQLQuery
		 * {PreparedStatement} preparedStatement : PreparedStatement to be supplied to connection object.  
		 * {ResultSet} resultSet : ResultSet representing the result of parsed SQLQuery.
		 */
		
		String sql = "SELECT * FROM test_table WHERE id = ?";
		PreparedStatement preparedStatement = connection.prepareStatement(sql);
		preparedStatement.setLong(1, paramId);
		ResultSet resultSet = preparedStatement.executeQuery();

		return resultSet;
	}

	/**
	 * @param {Long} paramHeightGt : Long representing the paramHeightGt
	 * 
	 * @return {ResultSet} resultSet : ResultSet of parsed SQLQuery.
	 * @throws SQLException
	 */
	public static ResultSet getHeightGreaterThan(Long paramHeightGt)
			throws SQLException {

		 /* 
		 *  {String} sql : String representing the SQLQuery
		 *  {PreparedStatement} preparedStatement : PreparedStatement to be supplied to connection object.  
		 *  {ResultSet} resultSet : ResultSet representing the result of parsed SQLQuery.
		 */
		
		//FIXME - SQL Injection security loop hole
		String sql = "SELECT * FROM test_table WHERE height > ?";
		PreparedStatement preparedStatement = connection.prepareStatement(sql);
		preparedStatement.setLong(1, paramHeightGt);
		ResultSet resultSet = preparedStatement.executeQuery();

		return resultSet;
	}

	/**
	 * @param {Long} paramHeightLt : Long representing the paramHeightLt
	 * 
	 * @return {ResultSet} resultSet : ResultSet of parsed SQLQuery.
	 * @throws SQLException
	 */
	public static ResultSet getHeightLessThan(Long paramHeightLt)
			throws SQLException {
		
		 /* 
		 * {String} sql : String representing the SQLQuery
		 * {PreparedStatement} preparedStatement : PreparedStatement to be supplied to connection object.  
		 * {ResultSet} resultSet : ResultSet representing the result of parsed SQLQuery.
		 */
		String sql = "SELECT * FROM test_table WHERE height < ?";
		PreparedStatement preparedStatement = connection.prepareStatement(sql);
		preparedStatement.setLong(1, paramHeightLt);
		ResultSet resultSet = preparedStatement.executeQuery();

		return resultSet;
	}

	/**
	 * @param {String} queryString : String representing the queryString
	 * 
	 * @return {ResultSet} resultSet : ResultSet of parsed SQLQuery.
	 * @throws SQLException
	 */
	public static ResultSet getValuesByQueryParams(String queryString,List<Float> coordsValue)
			throws SQLException {

		 /* 
		 * {PreparedStatement} preparedStatement : PreparedStatement to be supplied to connection object.  
		 * {ResultSet} resultSet : ResultSet representing the result of parsed SQLQuery.
		 */
		
		PreparedStatement preparedStatement = connection
				.prepareStatement(queryString);
		
		for(int i=0;i<coordsValue.size(); i++){
			preparedStatement.setFloat((i+1), coordsValue.get(i));
		}
		
		ResultSet resultSet = preparedStatement.executeQuery();
		return resultSet;
	}

}
