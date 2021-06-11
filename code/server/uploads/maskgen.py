import cv2
import numpy as np
import os
import sys

pathupload = os.getcwd() + '\\uploads\\'
pathimage = pathupload

n = len(sys.argv)
 
for i in range(1, n): 
    pathimage = pathupload
    pathimage += sys.argv[i]
    print(pathimage)
    # Open image
    img = cv2.imread(pathimage)
    # using hsv
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    low_brown = np.array([7, 0, 0])
    high_brown = np.array([17, 255, 255])

    # detect all brown mask in range
    brown_mask = cv2.inRange(hsv, low_brown, high_brown)
    # Save logical mask
    pathmask = os.getcwd() + '\\mask_images\\' + sys.argv[i]
    cv2.imwrite(pathmask, (brown_mask).astype(np.uint8))
    # mask = cv2.imread("result2.jpg")
    # final = cv2.bitwise_and(img, mask)
    # cv2.imwrite("final2.jpg", final)


    








