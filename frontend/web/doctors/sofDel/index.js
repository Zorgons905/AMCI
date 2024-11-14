export async function softDeleteDoctor(id) {
    if (confirm('Are you sure you want to soft delete this doctor?')) {
        try {
            const response = await fetch(`http://localhost:5000/doctors/${id}/sofdel`, {
                method: 'PATCH',
            });
            if (response.ok) {
                alert('Doctor soft deleted successfully');
                loadDoctors();
            }
        } catch (error) {
            console.error('Error soft deleting doctor:', error);
        }
    }
}
