/**
 * @author sadikr
 *
 */
package models;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import play.db.*;

public class selectRecords {

	/**
	 * slectRecordFromTable(Long id)
	 * 
	 * Accepts id and fetches record from table for the provided id.
	 * 
	 * @param id
	 * @return resultSet
	 */
	
	public static ResultSet selectRecordFromTable(Long id) throws SQLException{
		
		Connection con = DB.getConnection();
		PreparedStatement preparedStatement = con.prepareStatement("SELECT * FROM test_table WHERE id="+id);
		ResultSet resultSet = preparedStatement.executeQuery();
		return resultSet;

		
	}
	/**
	 * selectAllRecordsFromTable()
	 * 
	 * Fetches all the records from Table
	 * 
	 * @param -
	 * @return resultSet
	 */
	
	public static ResultSet selectAllRecordsFromTable() throws SQLException{
		Connection con = DB.getConnection();
		PreparedStatement preparedStatement = con.prepareStatement("SELECT * FROM test_table LIMIT 10");
		ResultSet resultSet = preparedStatement.executeQuery();

//		while(resultSet.next()){
//			System.out.println(resultSet.getString(2));
//		}
		
		return resultSet;
	}

}
