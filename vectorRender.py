import torch
from PIL import Image
import open_clip
import numpy as np

model, _, preprocess = open_clip.create_model_and_transforms('ViT-B-32', pretrained='laion2b_s34b_b79k')

def image_to_vector(image_path_or_pil):
    if isinstance(image_path_or_pil, str):
        image = Image.open(image_path_or_pil)
    else:
        image = image_path_or_pil
    
    image = preprocess(image).unsqueeze(0)
    
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)
    image = image.to(device)
    with torch.no_grad():
        image_features = model.encode_image(image)
        image_features /= image_features.norm(dim=-1, keepdim=True) 
        image_vector = image_features[0].cpu().numpy().tolist()
    
    return image_vector

image_vector = image_to_vector("Logo-Hotpick.png")
print(image_vector)

import sys
import os
import torch
import open_clip
import numpy as np
from PIL import Image
import subprocess
import tempfile
import shutil
from pathlib import Path

def find_ffmpeg():
    
    possible_paths = [
        'ffmpeg',
        r'C:\ffmpeg\bin\ffmpeg.exe',
        r'C:\Program Files\ffmpeg\bin\ffmpeg.exe',
    ]
    
    winget_base = Path.home() / 'AppData' / 'Local' / 'Microsoft' / 'WinGet' / 'Packages'
    if winget_base.exists():
        for package_dir in winget_base.glob('*ffmpeg*'):
            for ffmpeg_path in package_dir.rglob('ffmpeg.exe'):
                possible_paths.append(str(ffmpeg_path))
    
    for path in possible_paths:
        try:
            result = subprocess.run([path, '-version'], capture_output=True, timeout=5)
            if result.returncode == 0:
                return path
        except:
            continue
    
    return None


def video_to_vector_simple(video_path, num_frames=10, ffmpeg_path='ffmpeg'):
    
    print(f"Video: {video_path}")
    
    temp_dir = tempfile.mkdtemp()
    print(f"Temp folder: {temp_dir}")
    
    try:
        print(f"Extracting {num_frames} frames with ffmpeg...")
        
        output_pattern = os.path.join(temp_dir, 'frame_%03d.jpg')
        
        cmd = [
            ffmpeg_path, '-i', video_path,
            '-vf', f'fps=1/{max(1, 60//num_frames)}',
            '-frames:v', str(num_frames),
            '-y',  
            output_pattern
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        frame_files = sorted([f for f in os.listdir(temp_dir) if f.endswith('.jpg')])

        model, _, preprocess = open_clip.create_model_and_transforms(
            'ViT-B-32',
            pretrained='laion2b_s34b_b79k'
        )
        model.eval()
        embeddings = []
        
        for i, frame_file in enumerate(frame_files[:num_frames]):
            img_path = os.path.join(temp_dir, frame_file)
            img = Image.open(img_path).convert('RGB')
            
            img_tensor = preprocess(img).unsqueeze(0)
            
            with torch.no_grad():
                embedding = model.encode_image(img_tensor)
                embedding = embedding / embedding.norm(dim=-1, keepdim=True)
            
            embeddings.append(embedding.cpu().numpy().flatten())
            print(f"  {i+1}/{len(frame_files[:num_frames])}", end='\r')
        
        
        video_vector = np.mean(embeddings, axis=0)
        video_vector = video_vector / (np.linalg.norm(video_vector) + 1e-8)
        
        return video_vector
    
    finally:
        try:
            shutil.rmtree(temp_dir)
        except:
            pass


if __name__ == "__main__":
    ffmpeg_path = find_ffmpeg()
    
    video_path = '3181206-hd_1920_1080_30fps.mp4'
    num_frames = int(sys.argv[2]) if len(sys.argv) > 2 else 10
    
    vector = video_to_vector_simple(video_path, num_frames, ffmpeg_path)
    
    print(f"{vector}")
    