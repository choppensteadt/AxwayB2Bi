//
//  Appcelerator Titanium Mobile
//  WARNING: this is a generated file and should not be modified
//

#import <UIKit/UIKit.h>
#define _QUOTEME(x) #x
#define STRING(x) _QUOTEME(x)

NSString * const TI_APPLICATION_DEPLOYTYPE = @"development";
NSString * const TI_APPLICATION_ID = @"com.axway.b2bcommunitymanagement";
NSString * const TI_APPLICATION_PUBLISHER = @"choppensteadt";
NSString * const TI_APPLICATION_URL = @"http://www.axway.com";
NSString * const TI_APPLICATION_NAME = @"AxwayB2BCommunityManagement";
NSString * const TI_APPLICATION_VERSION = @"1.0";
NSString * const TI_APPLICATION_DESCRIPTION = @"Axway B2Bi for Mobile Devices";
NSString * const TI_APPLICATION_COPYRIGHT = @"2017 by choppensteadt";
NSString * const TI_APPLICATION_GUID = @"b7f4c876-98b2-425e-9555-cad14a4dc5c5";
BOOL const TI_APPLICATION_ANALYTICS = true;
BOOL const TI_APPLICATION_SHOW_ERROR_CONTROLLER = true;
NSString * const TI_APPLICATION_BUILD_TYPE = @"production";

#ifdef TARGET_IPHONE_SIMULATOR
NSString * const TI_APPLICATION_RESOURCE_DIR = @"";
#endif

int main(int argc, char *argv[]) {
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

	int retVal = UIApplicationMain(argc, argv, nil, @"TiApp");
    [pool release];
    return retVal;
}
