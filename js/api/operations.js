import {API_KEY, API_URL} from "./constants";

/**
 * Fetch all operations
 * @param {string} id - ID of task
 * @param {function} successCallback - Function that saves incoming data
 */
export const getOperations = async (id, successCallback) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}/operations`, {
            headers: {
                Authorization: API_KEY,
            },
        });

        const data = await response.json();

        if (data.error || typeof successCallback !== "function") {
            throw new Error("Błąd!");
        }

        successCallback(data.data);
    } catch (err) {
        console.log(err);
    }
};

export const addNewOperation = async (taskId, operationData) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}/operations`, {
            method: "POST",
            headers: {
                Authorization: API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(operationData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to add operation. Server response:', errorData);
            throw new Error(`Failed to add operation. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Successfully added operation:', data);

        return data;

    } catch (err) {
        console.log(err);
    }
}

export const deleteOperation = async (operationId) => {
    try {
        const response = await fetch(`${API_URL}/operations/${operationId}`, {
            method: "DELETE",
            headers: {
                Authorization: API_KEY,
            },
        })
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to delete operation. Server response:', errorData);
            throw new Error(`Failed to delete operation. Status: ${response.status}`);
        }
        console.log('Successfully deleted operation.');

    } catch (err) {
        console.log(err);
    }

}
