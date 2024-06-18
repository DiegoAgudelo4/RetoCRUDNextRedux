
export const fetchUsers = async (API_URL) => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Hubo un problema con la solicitud.');
        }
        const data = await response.json();
        //console.log(data)
        return data; 
    } catch (error) {
        console.error('Error:', error);
        return null; 
    }
};

export const fetchDeleteUser = async (API_URL, userId) => {
    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: 'DELETE', // Specify the DELETE method
      });
  
      if (!response.ok) {
        throw new Error('Error al eliminar el usuario.'); // More specific error message
      }
  
      // No data is typically returned on successful DELETE requests
      return { message: 'Usuario eliminado exitosamente.' }; // Informative message
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      return null; // Indicate error
    }
  };
  
  export const fetchCreateUser = async (API_URL, userData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',  // Use POST method for creating new data
        headers: { 'Content-Type': 'application/json' }, // Set appropriate headers
        body: JSON.stringify(userData),  // Convert user data to JSON for request body
      });
  
      if (!response.ok) {
        throw new Error('Hubo un problema al crear el usuario.'); // Specific error message
      }
  
      const data = await response.json();
      return data; // Return the created user data
    } catch (error) {
      console.error('Error al crear usuario:', error);
      return null; // Indicate error
    }
  };

  export const fetchUpdateUser = async (API_URL, userId, updatedUserData) => {
    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: 'PUT',  // Use PUT method for updating existing data
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUserData),  // Convert updated data to JSON
      });
  
      if (!response.ok) {
        throw new Error('Hubo un problema al actualizar el usuario.');
      }
  
      const data = await response.json();
      return data; // Return the updated user data
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      return null; // Indicate error
    }
  };