import cv2
import numpy as np
import sys

n = len(sys.argv)

for i in range(1, n):
    print(sys.argv[i])
    img = cv2.imread(sys.argv[i])
    print(img)

    if(img.size > 0):
        # using hsv
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

        lower_range = np.array([7, 0, 0])
        higher_range = np.array([17, 255, 255])

        # detect all brown mask in range
        brown_mask = cv2.inRange(hsv, lower_range, higher_range)
        # Save logical mask
        mask_image = 'm' + sys.argv[i]
        cv2.imwrite(mask_image, (brown_mask).astype(np.uint8))
        mask = cv2.imread(mask_image)
        final = cv2.bitwise_and(img, mask)
        diff_image = "d" + sys.argv[i]
        cv2.imwrite(diff_image, final)
