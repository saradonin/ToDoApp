import {API_KEY, API_URL} from "./constants";

/**
 * Fetch all tasks
 * @param {function} successCallback - Function that saves incoming data
 */
export const getTasks = async (successCallback) => {
    try {
        const response = await fetch(`${API_URL}/tasks`, {
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

/**
 * Add new task
 * @param taskData
 */
export const addNewTask = async (taskData) => {
    try {
        console.log(JSON.stringify(taskData))
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: {
                Authorization: API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to add task. Server response:', errorData);
            throw new Error(`Failed to add task. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Successfully added task:', data);

        return data;

    } catch (err) {
        console.log(err);
    }
};

