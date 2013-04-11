/**
 * 
 */
package models;

import play.db.DB;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * ApplicationModel
 * 
 * @author sadikr
 * 
 */
public class ApplicationModel {

	static Connection connection = DB.getConnection();

	/**
	 * @param {Long} paramId : Long representing the id
	 * @param {String} sql : String representing the SQLQuery
	 * @param {PreparedStatement} preparedStatement : PreparedStatement to be supplied to connection object.  
	 * @param {ResultSet} resultSet : ResultSet representing the result of parsed SQLQuery.
	 * @return {ResultSet} resultSet : ResultSet of parsed SQLQuery.
	 * @throws SQLException
	 */
	public static ResultSet getCoordinatesForId(Long paramId)
			throws SQLException {

		String sql = "SELECT * FROM test_table WHERE id=" + paramId;
		PreparedStatement preparedStatement = connection.prepareStatement(sql);
		ResultSet resultSet = preparedStatement.executeQuery();

		return resultSet;
	}

	/**
	 * @param {Long} paramHeightGt : Long representing the paramHeightGt
	 * @param {String} sql : String representing the SQLQuery
	 * @param {PreparedStatement} preparedStatement : PreparedStatement to be supplied to connection object.  
	 * @param {ResultSet} resultSet : ResultSet representing the result of parsed SQLQuery.
	 * @return {ResultSet} resultSet : ResultSet of parsed SQLQuery.
	 * @throws SQLException
	 */
	public static ResultSet getHeightGreaterThan(Long paramHeightGt)
			throws SQLException {

		String sql = "SELECT * FROM test_table WHERE height > " + paramHeightGt;
		PreparedStatement preparedStatement = connection.prepareStatement(sql);
		ResultSet resultSet = preparedStatement.executeQuery();

		return resultSet;
	}

	/**
	 * @param {Long} paramHeightLt : Long representing the paramHeightLt
	 * @param {String} sql : String representing the SQLQuery
	 * @param {PreparedStatement} preparedStatement : PreparedStatement to be supplied to connection object.  
	 * @param {ResultSet} resultSet : ResultSet representing the result of parsed SQLQuery.
	 * @return {ResultSet} resultSet : ResultSet of parsed SQLQuery.
	 * @throws SQLException
	 */
	public static ResultSet getHeightLessThan(Long paramHeightLt)
			throws SQLException {

		String sql = "SELECT * FROM test_table WHERE height < " + paramHeightLt;
		PreparedStatement preparedStatement = connection.prepareStatement(sql);
		ResultSet resultSet = preparedStatement.executeQuery();

		return resultSet;
	}

	/**
	 * @param {String} queryString : String representing the queryString
	 * @param {PreparedStatement} preparedStatement : PreparedStatement to be supplied to connection object.  
	 * @param {ResultSet} resultSet : ResultSet representing the result of parsed SQLQuery.
	 * @return {ResultSet} resultSet : ResultSet of parsed SQLQuery.
	 * @throws SQLException
	 */
	public static ResultSet getValuesByQueryParams(String queryString)
			throws SQLException {
		PreparedStatement preparedStatement = connection
				.prepareStatement(queryString);
		ResultSet resultSet = preparedStatement.executeQuery();

		return resultSet;
	}

}
