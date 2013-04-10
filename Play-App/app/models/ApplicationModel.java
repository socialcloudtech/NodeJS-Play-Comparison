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
 * @author sadikr
 *
 */
public class ApplicationModel {

	static Connection connection = DB.getConnection();
	
	public static ResultSet getCoordinatesForId(Long paramId) throws SQLException{
		
		String sql = "SELECT * FROM test_table WHERE id=" + paramId;
		PreparedStatement preparedStatement = connection.prepareStatement(sql);
		ResultSet resultSet = preparedStatement.executeQuery();
		
		return resultSet;
	}
	
	public static ResultSet getHeightGreaterThan(Long paramHeightGt) throws SQLException{
		
		String sql = "SELECT * FROM test_table WHERE height > "+paramHeightGt;
		PreparedStatement preparedStatement = connection.prepareStatement(sql);
		ResultSet resultSet = preparedStatement.executeQuery();
		
		return resultSet;
	}
	
	public static ResultSet getHeightLessThan(Long paramHeightLt) throws SQLException{
		
		String sql = "SELECT * FROM test_table WHERE height < "+paramHeightLt;
		PreparedStatement preparedStatement = connection.prepareStatement(sql);
		ResultSet resultSet = preparedStatement.executeQuery();
		
		return resultSet;
	}
	
	public static ResultSet getValuesByQueryParams(String queryString) throws SQLException{
		PreparedStatement preparedStatement = connection.prepareStatement(queryString);
		ResultSet resultSet = preparedStatement.executeQuery();
		
		return resultSet;
	}

}
