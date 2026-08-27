export type ArtworkImageVariant = "large" | "medium" | "thumb";

export interface ProcessedArtworkImage {
  variant: ArtworkImageVariant;
  blob: Blob;
  width: number;
  height: number;
}

const VARIANTS: Record<
  ArtworkImageVariant,
  { maxDimension: number; quality: number }
> = {
  large: {
    maxDimension: 2400,
    quality: 0.82,
  },
  medium: {
    maxDimension: 1200,
    quality: 0.80,
  },
  thumb: {
    maxDimension: 500,
    quality: 0.76,
  },
};

function calculateDimensions(
  width: number,
  height: number,
  maxDimension: number,
) {
  if (width <= maxDimension && height <= maxDimension) {
    return { width, height };
  }

  const scale = maxDimension / Math.max(width, height);

  return {
    width: Math.round(width * scale),
    height: Math.round(height * scale),
  };
}

async function loadImage(file: File): Promise<ImageBitmap | HTMLImageElement> {
  if ("createImageBitmap" in window) {
    return createImageBitmap(file, {
      imageOrientation: "from-image",
    });
  }

  const url = URL.createObjectURL(file);

  try {
    const image = new Image();

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () =>
        reject(new Error("Could not read image."));
      image.src = url;
    });

    return image;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function closeImage(
  image: ImageBitmap | HTMLImageElement,
) {
  if ("close" in image && typeof image.close === "function") {
    image.close();
  }
}

async function renderVariant(
  image: ImageBitmap | HTMLImageElement,
  variant: ArtworkImageVariant,
): Promise<ProcessedArtworkImage> {
  const config = VARIANTS[variant];

  const sourceWidth = image.width;
  const sourceHeight = image.height;

  const { width, height } = calculateDimensions(
    sourceWidth,
    sourceHeight,
    config.maxDimension,
  );

  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Could not create image processing canvas.");
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";

  context.drawImage(
    image,
    0,
    0,
    sourceWidth,
    sourceHeight,
    0,
    0,
    width,
    height,
  );

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(
      resolve,
      "image/webp",
      config.quality,
    );
  });

  if (!blob) {
    throw new Error(
      `Could not create WebP ${variant} image.`,
    );
  }

  return {
    variant,
    blob,
    width,
    height,
  };
}

export async function processArtworkImage(
  file: File,
): Promise<{
  original: File;
  large: ProcessedArtworkImage;
  medium: ProcessedArtworkImage;
  thumb: ProcessedArtworkImage;
}> {
  if (!file.type.startsWith("image/")) {
    throw new Error(
      `${file.name} is not a supported image file.`,
    );
  }

  const image = await loadImage(file);

  try {
    const [large, medium, thumb] = await Promise.all([
      renderVariant(image, "large"),
      renderVariant(image, "medium"),
      renderVariant(image, "thumb"),
    ]);

    return {
      original: file,
      large,
      medium,
      thumb,
    };
  } finally {
    closeImage(image);
  }
}