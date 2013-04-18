/**
 * 
 */
package models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import play.db.DB;

/**
 * 
 * @author sadikr
 * 
 */
public class ApplicationModel {

	static Connection connection = DB.getConnection();

	
	/**
	 * getCoordinatesForAll : It executes Select query on test_table to fetch all the rows.
	 * 
	 * @return {ResultSet} statement.executeQuery(sql) : ResultSet of parsed SQLQuery.
	 * 
	 * @throws SQLException
	 */
	public static ResultSet getCoordinatesForAll()
			throws SQLException {
		/*
		 * {String} sql : String representing the SQLQuery.
		 */
		String sql = "SELECT * FROM test_table LIMIT 100000";
		connection.setAutoCommit(false);
		Statement statement = connection.createStatement(ResultSet.TYPE_FORWARD_ONLY,ResultSet.CONCUR_READ_ONLY);
		return statement.executeQuery(sql);
	}
	
	
	/**
	 * getCoordinatesForId : It executes select query on test_table to fetch the row with particular Id.
	 * @param {Long} paramId : Long representing the id
	 * 
	 * @return {ResultSet} preparedStatement.executeQuery() : ResultSet of parsed SQLQuery.
	 * @throws SQLException
	 */
	public static ResultSet getCoordinatesForId(Long paramId)
			throws SQLException {

		/*
		 * {String} sql : String representing the SQLQuery
		 * {PreparedStatement} preparedStatement : PreparedStatement to be supplied to connection object.  
		 */
		
		String sql = "SELECT * FROM test_table WHERE id = ?";
		PreparedStatement preparedStatement = connection.prepareStatement(sql);
		preparedStatement.setLong(1, paramId);
		return preparedStatement.executeQuery();
	}

	/**
	 * getHeightGreaterThan : It executes the select query in test_table to fetch the rows which has height greater than paramHeightGt
	 * @param {Long} paramHeightGt : Long representing the paramHeightGt
	 * 
	 * @return {ResultSet} preparedStatement.executeQuery() : ResultSet of parsed SQLQuery.
	 * @throws SQLException
	 */
	public static ResultSet getHeightGreaterThan(Long paramHeightGt)
			throws SQLException {

		 /* 
		 *  {String} sql : String representing the SQLQuery
		 *  {PreparedStatement} preparedStatement : PreparedStatement to be supplied to connection object.  
		 */
		
		String sql = "SELECT * FROM test_table WHERE height > ? LIMIT 100000";
		PreparedStatement preparedStatement = connection.prepareStatement(sql);
		preparedStatement.setLong(1, paramHeightGt);
		return preparedStatement.executeQuery();
	}

	/**
	 * getHeightLessThan : It executes the select query in test_table to fetch the rows which has height less than paramHeightLt
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
		String sql = "SELECT * FROM test_table WHERE height < ? LIMIT 100000";
		PreparedStatement preparedStatement = connection.prepareStatement(sql);
		preparedStatement.setLong(1, paramHeightLt);
		return preparedStatement.executeQuery();
	}

	/**
	 * getValuesByQueryParams : It executes the select query on test_table to fetch the data with the parameters provided as condition.
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
		
		return preparedStatement.executeQuery();
	}
}
