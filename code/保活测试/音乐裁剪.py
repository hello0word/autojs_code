from pydub import AudioSegment
import os
 
 
def slice_file(base, file, skip):
    audio = AudioSegment.from_mp3(os.path.join(base, file))
    audio[:skip * 1000].export(r"C:\Users\X\OneDrive\autojs\resource\mp3" + file+"new", format="mp3")
 
 
if __name__ == '__main__':
    base = r"C:\Users\X\OneDrive\autojs\resource\mp3"
    for each in os.listdir(base):
        print(each)
        slice_file(base, each, 15)