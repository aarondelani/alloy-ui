#!/bin/bash -x ;-x for debugging

curScript=`perl -e "use Cwd qw(realpath);print realpath('$0');"`
curDir=`dirname $curScript`
projectDir=`perl -e "use Cwd qw(realpath);print realpath('$curDir/../../');"`

toDir=$1
fromDir=$2

if [[ ! $toDir ]]; then
	toDir="${projectDir}_export"
fi

if [[ ! $fromDir ]]; then
	fromDir=$projectDir
fi

parentDir=`dirname $toDir`

srcDir=${toDir}/src
demosDir=${toDir}/demos
buildDir=${toDir}/build

rm -rf $toDir
cp -R $fromDir $toDir

find $toDir -type d -name ".svn" | xargs rm -rf

find ${toDir} -type f -name "build.xml" | xargs perl -pi -e 's/<property name="build\.aui\.prefix" value=""\/>/<property name="build.aui.prefix" value="gallery-"\/>/g;'

find $demosDir/* -type f -name "*.html" | xargs perl -pi -e 's/<script src="\.\.\/\.\.\/build\/aui\/aui\.js" type="text\/javascript"><\/script>/<script src="..\/..\/build\/yui\/yui.js" type="text\/javascript"><\/script><script src="..\/..\/build\/aui-base\/aui-base.js" type="text\/javascript"><\/script>/g;'

find $srcDir/aui-base -type f -name "build.properties" | xargs perl -pi -e 's/(,widget-css)/$1,aui-skin-base/g;'

find $srcDir/* -type f \( -name "build*.xml" -or -name "build*.properties" \) | xargs perl -pi -e 's/aui-/gallery-aui-/g;'
find $srcDir/* -type f -name "*.css" | xargs perl -pi -e 's/\.aui-/.yui3-/g;'
find $srcDir/* -type f -name "*.css" | xargs perl -pi -e 's/\/aui-/\/gallery-aui-/g;'
find $demosDir/* -type f -name "*.html" | xargs perl -pi -e "s/(\/|')aui-/\$1gallery-aui-/g;"
find $demosDir/* -type f -name "*.html" | xargs perl -pi -e "s/([^gallery-])aui-/\$1yui3-/g;"
find $demosDir/* -type f -name "*.html" | xargs perl -pi -e "s/\.ready\(/.use(/g;"
find $demosDir/* -type f -name "*.html" | xargs perl -pi -e "s/\.use\(/.use('gallery-aui-skin-classic',/g;"
find $demosDir/* -type f -name "*.html" | xargs perl -pi -e "s/AUI\(\)/YUI(YUI.AUI_config)/g;"
find $demosDir/* -type f -name "*.html" | xargs perl -pi -e "s/AUI\(/YUI(/g;"

for f in `find $srcDir -name 'aui-*' -or -name 'build.aui-*'` ;
do
	cp -R $f ${f//aui-/gallery-aui-}
done

rm -rf `find $srcDir -name 'aui-*' -or -name 'build.aui-*'`
rm -rf `find $buildDir -type d -name 'aui-*'`

#flatten rollups
for f in `find $srcDir -name 'build.gallery-aui-*.properties'` ;
do
	newName=${f}
	baseName=`basename $newName`
	oldDirName=`dirname $newName`
	baseModuleName=`basename $oldDirName`

	moduleName=${baseName#build.}
	moduleName=${moduleName%.properties}
	
	oldModuleDir=$oldDirName
	newModuleDir=$srcDir/$moduleName
	mkdir -p $newModuleDir/js

	mv $oldModuleDir/build.$moduleName.properties $newModuleDir/build.properties
	mv $oldModuleDir/build.$moduleName.xml $newModuleDir/build.xml
	mv $oldModuleDir/js/$moduleName.js $newModuleDir/js/$moduleName.js

	coreCSSFile=assets/${moduleName}-core.css
	skinCSSFile=assets/skins/sam/${moduleName}-skin.css

	if [[ -f $oldModuleDir/$coreCSSFile ]]; then
		mkdir -p $newModuleDir/assets
		mv $oldModuleDir/$coreCSSFile $newModuleDir/$coreCSSFile
	fi
	
	if [[ -f $oldModuleDir/$skinCSSFile ]]; then
		mkdir -p $newModuleDir/assets/skins/sam
		mv $oldModuleDir/$skinCSSFile $newModuleDir/$skinCSSFile
	fi

	perl -pi -e 's/^(srcdir|global\.)/#$1/g;' $newModuleDir/build.properties
	perl -pi -e "s/build\.${moduleName}\.properties/build.properties/g;" $newModuleDir/build.xml
	
	touch $oldModuleDir/js/${baseModuleName}.js
	perl -pi -e 's/^(srcdir|global\.|component\.rollup)/#$1/g;' $oldModuleDir/build.properties
	perl -pi -e "s/^(component=)/component.jsfiles=${baseModuleName}.js\n\$1/g;" $oldModuleDir/build.properties
	perl -pi -e "s/^component.use=/component.requires=/g;" $oldModuleDir/build.properties
done

find ${toDir} -type f -name "build.xml" | xargs perl -pi -e 's/<import file="\.\.\/\.\.\/resources\/builder\/bootstrap\.xml" \/>/<import file="\${builddir}\/3.x\/bootstrap.xml" \/>/g;'

find ${toDir} -type f -name "build.properties" | xargs perl -pi -e "s/^(component=)/lint.skip=true\n\$1/"
find ${toDir} -type f -name "build.properties" | xargs perl -pi -e "s/^(component=)/builddir=..\/..\/..\/builder\/componentbuild\n\$1/"
find ${toDir} -type f -name "build.properties" | xargs perl -pi -e "s/^(component=)/yui.variable=A\n\$1/"

#Uncomment the following lines to move the builder to it's default location
#above the project directory
# perl -pi -e 's/<import file="resources\/builder\/bootstrap\.xml"\/>//' ${toDir}/build.xml
# 
# if [[ ! -d ${parentDir}/builder ]]; then
# 	cp -R ${toDir}/lib/builder ${parentDir}/builder
# fi

cd $toDir

ant build-gallery
ant generate-skin-src

if [[ $? = 0 ]]; then
	find ${toDir}/src -type d -name "_diffs" | xargs rm -rf
	find ${toDir}/src -type f -name "build.all-css.*" | xargs rm
fi