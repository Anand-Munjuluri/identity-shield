from flask import Flask, request, jsonify
import sys
sys.path.append('/Library/Frameworks/Python.framework/Versions/3.11/lib/python3.11/site-packages')
import cv2

import cv2


app = Flask(__name__)

@app.route('/upload-identity-proof', methods=['POST'])
def upload_identity_proof():
    if 'identityProof' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    identity_proof = request.files['identityProof']
    if identity_proof.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    # Save the uploaded identity proof file
    identity_proof.save('uploaded_identity_proof.jpg')
    
    return jsonify({'message': 'Identity proof uploaded successfully'}), 200

@app.route('/verify-kyc', methods=['POST'])
def verify_kyc():
    # Load the uploaded identity proof image
    identity_proof_image = cv2.imread('uploaded_identity_proof.jpg')
    
    # Load the captured live photo
    captured_photo = cv2.imread('captured_photo.jpg')
    
    # Implement face comparison logic using OpenCV
    # This is just a placeholder, replace it with your actual face comparison code
    
    # Assume faces match for demo purposes
    faces_match = True
    
    if faces_match:
        return jsonify({'result': 'KYC verification successful'}), 200
    else:
        return jsonify({'result': 'KYC verification failed'}), 400

if __name__ == '__main__':
    app.run(debug=True)
