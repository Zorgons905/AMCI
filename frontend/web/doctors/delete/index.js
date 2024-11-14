export async function permanentlyDeleteDoctor(id) {
    if (confirm('Are you sure you want to permanently delete this doctor?')) {
        try {
            const response = await fetch(`http://localhost:5000/doctors/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Doctor permanently deleted');
                loadDoctors();
            }
        } catch (error) {
            console.error('Error permanently deleting doctor:', error);
        }
    }
}
